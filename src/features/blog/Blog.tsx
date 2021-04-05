import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './blog.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { User } from '../user/User';
import { fetchAllUserAsync } from '../user/userSlice';
import { blogsSelectors, deteleBlog, fetchBlogAsync, IBlog, updateBlog } from './blogSlice';

interface PopupProps {
    blog: IBlog;
    onClose: any;
}
const DeleteModelPopup = (props: PopupProps) => {
    const dispatch = useAppDispatch();

    return <div id="myModal" className="modal">
        <div className="modal-content">
            <span className="close" onClick={(e) => props.onClose()}>&times;</span>
            <p> Are you sure to delete blog ({props.blog.id}) with title ({props.blog.title})</p>
            <div className="modal-footer">
                <button type="button" style={{ marginRight: "10px;" }}
                onClick= {
                    ()=>{
                        dispatch(deteleBlog(props.blog.id))
                         props.onClose();
                    
                    }
                }
                > Delete</button>
                <button type="button"
                 onClick= {
                    ()=>{
                         props.onClose();
                    
                    }
                }> Cancle</button>
            </div>
        </div>
    </div>
}

const EditModelPopup = (props: PopupProps) => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState(props.blog.title);
    const [body, setBody] = useState(props.blog.body);

   

    return <div id="myModal" className="modal">
        <div className="modal-content">
            <span className="close" onClick={(e) => props.onClose()}>&times;</span>
            <p> Edit Blog ({props.blog.id})</p>
            <div>
                <label> title</label> <input type="text" defaultValue={props.blog.title}
                    onChange={e => setTitle(e.target.value)}
                />
                <br />
                <label>body</label>  <textarea defaultValue={props.blog.body}
                    onChange={e => setBody(e.target.value)}
                />

            </div>

            <div className="modal-footer">
                <button type="button" style={{ marginRight: "10px;" }} onClick= {
                    ()=>{
                        dispatch(updateBlog({ id: props.blog.id, changes: { 
                            body,
                            title,
                            userId: props.blog.userId
                         } }))
                         props.onClose();
                    
                    }
                }> Update</button>
                <button type="button" 
                 onClick= {
                    ()=>{
                         props.onClose();
                    
                    }
                }
                > Cancle</button>
            </div>
        </div>
    </div>
}

export function Blog() {
    const [canEdit, setEdit] = useState(false);
    const [canDelete, setDelete] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<undefined | IBlog>(undefined);
    const dispatch = useAppDispatch();

    const blogs = useSelector(blogsSelectors.selectAll);
    useEffect(() => {
        dispatch(fetchBlogAsync())
        dispatch(fetchAllUserAsync())
    }, [])

    return (
        <div>
            <a style={{float:"right", display:'block', clear: 'both'}} href="#" onClick={() => {
                            // TODO
                        }} > New Blog</a> 
            {selectedBlog && canDelete && <DeleteModelPopup onClose={() => { setDelete(false) }} blog={selectedBlog} />}
            {selectedBlog && canEdit && <EditModelPopup onClose={() => { setEdit(false) }} blog={selectedBlog} />}
            <table>
                <tr>
                    <th>Id</th>
                    <th>User</th>
                    <th>title </th>
                    <th>Body</th>
                    <th>Action</th>
                </tr>
                {blogs.map(e => <tr>
                    <td>{e.id}</td>
                    <td><User id={e.userId}></User>
                    </td>
                    <td>{e.title}</td>
                    <td className="blogBody"> {e.body}</td>
                    <td className="action   ">
                        <a href="#" onClick={() => {
                            setSelectedBlog(e);
                            setEdit(true);
                        }} > edit</a>/
                           <a href="#" onClick={() => {
                            setSelectedBlog(e)
                            setDelete(true);
                        }} > delete</a> </td>
                </tr>
                )}
            </table>


        </div>
    );
}
