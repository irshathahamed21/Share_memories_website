import React, {useState, useEffect} from 'react'
import {Paper, Typography,TextField,Button} from "@material-ui/core"
import FileBase from "react-file-base64"
import useStyles from './styles';
import {useDispatch,useSelector} from "react-redux"
import {updatePost, createPost} from "../../actions/posts"


function Form({currentId, setCurrentId}) {
  const[postData, setPostData] = useState({creator:"", title:"", message:"",tags:"", selectedFile:""})
  const post = useSelector((state) => currentId ? state.posts.find((message) => message._id === currentId ) : null )
  const classes = useStyles()
  const dispatch = useDispatch()


  useEffect(() => {
    if(post) {
      setPostData(post)
      console.log(post)
      console.log(postData)
    }

  },[post])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(currentId === 0){
      dispatch(createPost(postData))
      clear()

    }
    else {
      dispatch(updatePost(currentId,postData))
      clear()
    }

  }

  const clear = () => {
    setCurrentId(0);
    setPostData({creator:"", title:"", message:"",tags:"", selectedFile:""})
  }

  
  return (
    <Paper className={classes.paper}>
      <form className={`${classes.root} ${classes.form}`} autoComplete='off' noValidate onSubmit={handleSubmit}>
      <Typography variant = "h6"></Typography> 
      <TextField name = "creator" variant = "outlined" label = "Creator" fullWidth value = {postData.creator} onChange = {(e) => {setPostData({...postData, creator:e.target.value})}} / >
      <TextField name = "title" variant = "outlined" label = "Title" fullWidth value = {postData.title} onChange = {(e) => {setPostData({...postData, title:e.target.value})}} / >
      <TextField name = "message" variant = "outlined" label = "Message" fullWidth value = {postData.message} onChange = {(e) => {setPostData({...postData, message:e.target.value})}} / >
      <TextField name = "tags" variant = "outlined" label = "Tags" fullWidth value = {postData.tags} onChange = {(e) => {setPostData({...postData, tags:e.target.value.split(",")})}} / >
      <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
      <Button className={classes.buttonSubmit} type = "submit" size = "large" fullWidth variant = "contained" color= "primary">Submit</Button>
      <Button fullWidth variant = "contained" size = "small" color = "secondary" onClick = {clear}>Clear</Button>

    
      </form>
    </Paper>
  )
}

export default Form