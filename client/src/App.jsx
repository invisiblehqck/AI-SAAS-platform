import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BlogTitles from "./Pages/BlogTitles";
import Dashboard from "./pages/Dashboard";
import RemoveBackground from "./Pages/RemoveBackground";
import RemoveObjects from "./Pages/RemoveObjects";
import ReviewResume from "./Pages/ReviewResume";
import WriteArticle from "./pages/WriteArticle";
import GenerateImages from "./Pages/GenerateImages";
import Community from "./Pages/Community";
import Layout from "./pages/Layout";
// import { useAuth } from "@clerk/clerk-react";/
// import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  // const { getToken } = useAuth();

  // useEffect(() => {
  //   getToken().then((token) => console.log(token));
  // }, [getToken]);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-objects" element={<RemoveObjects />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
