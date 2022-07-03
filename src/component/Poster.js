import React, { useState, useEffect } from "react";
import { config } from "../config";

const Poster = () => {
    const CoverUrl = config.CoverUrl;
    const backgroundImage = config.BackgroundImage;

    const [image, setImage] = useState(null);
    const [cover, setCover] = useState(null);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [writer, setWriter] = useState("");

    //獲取canvas元素
    const canvas = document.getElementById("cover");

    useEffect(() => {
        const title = config.Title;
        const textA = config.Content;
        const writer = config.Writer;
        //去除所有<html>元素
        var strippedHtml = textA.replace(/<[^>]+>/g, "");
        var cleanText = strippedHtml.replace(/&nbsp;/g, "").replace("▲", "");
        var newContent = cleanText.substr(0, 100);
        var newValue =
            newContent.slice(0, 20) +
            "\n" +
            newContent.slice(20, 40) +
            "\n" +
            newContent.slice(40, 60) +
            "\n" +
            newContent.slice(60, 80) +
            "\n" +
            newContent.slice(80, 100) +
            "\n" +
            "......";
        //newContent = newContent.insert(50, "\n");
        var newTitle = title.slice(0, 15) + "\n" + title.slice(15, 30);
        setTopText(newTitle);
        setBottomText(newValue);
        setWriter(writer);

        // 转为png格式的图片_底圖
        const catImage = new Image();
        catImage.src = backgroundImage;
        catImage.onload = () => setImage(catImage);

        // 转为png格式的图片_封面
        const coverImage = new Image();
        coverImage.src = CoverUrl;
        coverImage.onload = () => setCover(coverImage);
    }, []);

    useEffect(() => {
        if (image && cover && canvas) {
            const ctx = canvas.getContext("2d");
            //背景
            ctx.drawImage(image, 0, 0, config.PosterWidth, config.PosterHeight);

            //封面
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;
            ctx.shadowColor = "black";
            ctx.shadowBlur = 30;
            ctx.drawImage(
                cover,
                config.PosterWidth / 20,
                config.PosterHeight / 5,
                config.PosterWidth / 2,
                ((config.PosterWidth / 2) * cover.height) / cover.width
            );

            //標題
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowColor = "black";
            ctx.shadowBlur = 0;
            ctx.font = `bold ${config.TitleSize}px Microsoft JhengHei`;
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            var lines = topText.split("\n");
            var lineheight = config.TitleSize * 1.5;
            for (var i = 0; i < lines.length; i++) {
                ctx.fillText(
                    lines[i],
                    config.PosterWidth / 1.7,
                    config.PosterHeight / 5 + i * lineheight
                );
            }

            //作者
            ctx.font = `bold ${config.WriterSize}px Microsoft JhengHei`;
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.fillText(
                "▲" + writer,
                config.PosterWidth / 1.7,
                config.PosterHeight / 2.8
            );

            //下面預覽
            ctx.font = `${config.ContentSize}px Microsoft JhengHei`;
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            var lines = bottomText.split("\n");
            var lineheight = config.ContentSize * 1.5;
            for (var i = 0; i < lines.length; i++) {
                ctx.fillText(
                    lines[i],
                    config.PosterWidth / 1.7,
                    config.PosterHeight / 2.2 + i * lineheight
                );
            }
            //ctx.fillText(bottomText);
        }
    }, [image, canvas, cover, topText, bottomText]);

    return (
        <div>
            <div>
                <canvas width={1600} height={800} id="cover" />
            </div>
            <br />
        </div>
    );
};

export default Poster;
