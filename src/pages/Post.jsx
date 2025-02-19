import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [content, setContent] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    
    useEffect(() => {
        const fetchPost = async () => {
            if (!userData) {
                navigate("/login");
                return;
            }

            if (slug) {
                const fetchedPost = await appwriteService.getPost(slug);
                if (fetchedPost) {
                    setPost(fetchedPost);
                    const contentText = await appwriteService.getFileContent(fetchedPost.content);
                    setContent(contentText);
                } else {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        };

        fetchPost();
    }, [slug, navigate, userData]);
    if (!userData) {
        return null; // Return null to prevent rendering until user is logged in
    }

    const isAuthor = post && userData ? post.userId === userData?.$id : false;
    console.log("post id",post?.userId);
    console.log("isAuthot",isAuthor)
    console.log("userid",userData.$id)

    // useEffect(() => {
    //     const fetchPost = async () => {
    //         if (slug) {
    //             const fetchedPost = await appwriteService.getPost(slug);
    //             if (fetchedPost) {
    //                 setPost(fetchedPost);
    //                 const contentText = await appwriteService.getFileContent(fetchedPost.content);
    //                 setContent(contentText);
    //             } else {
    //                 navigate("/");
    //             }
    //         } else {
    //             navigate("/");
    //         }
    //     };

    //     fetchPost();
    // }, [slug, navigate]);
    
    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="flex items-center justify-center p-4">
            <div className="w-full mt-8 max-w-6xl bg-white border shadow-lg rounded-xl flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 flex justify-center relative rounded-xl p-8">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded h-60 w-80"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-4">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600" className="mr-3 hover:bg-green-800">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-600" className="hover:bg-green-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full md:w-1/2 flex flex-col p-4">
                    <h1 className="text-3xl text-center mt-2 font-semibold text-black">{post.title}</h1>
                    <div className="browser-css text-lg mt-4 text-black">
                        {parse(content)}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
