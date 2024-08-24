import { useState } from "react";
import { compress } from "squoosh-compress";
import "./App.css";

function App() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<string>("");
  const [compressedSize, setCompressedSize] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImage(file);
      setOriginalSize(`${(file.size / 1024).toFixed(2)} KB`);
    }
  };

  const compressImage = async () => {
    if (!originalImage) {
      alert("请先选择一张图片");
      return;
    }

    try {
      const compressedFile = await compress(
        originalImage,
        {
          type: "browser-webp",
          options: {
            quality: 0.4,
          },
        },
        originalImage.name
      );

      setCompressedImage(compressedFile);
      setCompressedSize(`${(compressedFile.size / 1024).toFixed(2)} KB`);
    } catch (error) {
      console.error("压缩过程中发生错误:", error);
      alert("压缩失败，请重试");
    }
  };

  return (
    <div>
      <h1>图片压缩示例</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={compressImage}>压缩图片</button>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div style={{ marginRight: 8 }}>
          <h3>原图</h3>
          {originalImage && (
            <img src={URL.createObjectURL(originalImage)} alt="Original" style={{ maxWidth: "100%" }} />
          )}
          <p>原始大小: {originalSize}</p>
        </div>
        <div>
          <h3>压缩后</h3>
          {compressedImage && (
            <img src={URL.createObjectURL(compressedImage)} alt="Compressed" style={{ maxWidth: "100%" }} />
          )}
          <p>压缩后大小: {compressedSize}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
