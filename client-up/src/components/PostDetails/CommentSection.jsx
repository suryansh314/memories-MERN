import React, {useState} from 'react';
import {Typography, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';

import useStyles from './styles';
import {commentPost} from '../../actions/posts';

const CommentSection = ({post}) => {
    const [comments, setComments] = useState(post?.comments?.reverse());
    const [comment, setComment] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("profile"));

    const handleClick = async() => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        
        setComments(newComments?.reverse());
        setComment('');
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c,i)=>(
                        <Typography key={i} gutterBottom variant="subtitle1">
                           <strong>{c.split(': ')[0]}</strong>
                           {c.split(':')[1]}
                        </Typography>))}
                </div>
                {user?.result?.name && (<div style={{width: '70%'}}>
                <Typography gutterBottom variant="h6">Leave a Comment</Typography>
                <TextField 
                    fullWidth
                    rows={4}
                    variant="outlined"
                    label="Comment"
                    multiline
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                />
                <Button 
                    style={{marginTop: '10px'}} 
                    fullWidth 
                    disabled={!comment} 
                    variant="contained" 
                    onClick={handleClick}
                    color="primary"
                >Comment</Button>
                </div>)}
                
            </div>
        </div>
    );
}

export default CommentSection;