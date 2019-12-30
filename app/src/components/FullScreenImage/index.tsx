import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
const FullScreenImage= ({src = "", onClose }) => {
    const coverStyles: React.CSSProperties = {
        position: "fixed",
        top: "0", right: "0", bottom: "0", left: "0",
        display: "flex", justifyContent: "center", alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.2)"
    };
    const imageStyle: React.CSSProperties = {
      // boxShadow: "rgba(0,0,0,0.1) 0 0 5px",
    };
    return (
        <div style={coverStyles} onClick={onClose}>
            <img src={src} style={imageStyle} alt="图片加载失败" />
        </div>
    );
};

class ImageUtils {
    static container: HTMLElement;
    static previewInFullScreen(src: string) {
        const image = <FullScreenImage src={src} onClose={this.handleClose.bind(this)}/>;
        if (!this.container) {
            this.container = document.createElement("div");
            document.body.append(this.container);
        }

        ReactDOM.render(image, this.container);
        this.container.style.display = "block";
    }

    static handleClose() {
        if (this.container) {
            this.container.style.display = "none";
        }
    }
}

export default ImageUtils;

