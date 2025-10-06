# 相框配置系统使用指南

## 概述
这个系统允许你通过修改 `frames.json` 文件来轻松管理网站上的相框，无需修改代码。

## 配置文件结构

### `configs/frames.json`
包含所有相框的配置信息：

```json
{
  "frames": [
    {
      "id": "frame_test_2",
      "name": "Classic Frame",
      "filename": "frame_test_2.png",
      "price": 49,
      "size": "10\" x 8\"",
      "description": "A timeless classic frame that complements any photo",
      "specs": {
        "frameSize": 1000,
        "canvasSize": 400,
        "transparentWidth": 603,
        "transparentHeight": 603,
        "transparentX": 198.5,
        "transparentY": 198.5
      },
      "exampleImage": "assets/frames/example_frame_1_1x1_classic_horizontal.png",
      "category": "classic"
    }
  ],
  "settings": {
    "defaultFrame": "frame_test_2",
    "baseUrl": {
      "local": "",
      "production": "/AFrameSite"
    },
    "imageRequirements": {
      "minWidth": 500,
      "minHeight": 500
    }
  }
}
```

## 字段说明

### 相框信息 (frames)
- **id**: 相框的唯一标识符
- **name**: 显示给用户的相框名称
- **filename**: 相框图片文件名（存放在 `assets/frames/` 目录）
- **price**: 相框价格（数字）
- **size**: 相框尺寸描述（字符串）
- **description**: 相框描述
- **category**: 相框分类

### 技术规格 (specs)
- **frameSize**: 相框图片的原始尺寸（像素）
- **canvasSize**: 显示画布尺寸（像素）
- **transparentWidth**: 透明区域宽度（像素）
- **transparentHeight**: 透明区域高度（像素）
- **transparentX**: 透明区域X坐标偏移
- **transparentY**: 透明区域Y坐标偏移

### 设置 (settings)
- **defaultFrame**: 默认相框ID
- **imageRequirements**: 图片要求的最小尺寸

## 如何添加新相框

1. **准备相框图片**
   - 将相框图片放在 `assets/frames/` 目录
   - 建议使用PNG格式以支持透明度

2. **测量相框规格**
   - 使用图像编辑软件打开相框图片
   - 测量透明区域的精确位置和尺寸
   - 记录 frameSize（通常是1000x1000或类似尺寸）

3. **添加配置**
   ```json
   {
     "id": "my_new_frame",
     "name": "My New Frame",
     "filename": "my_new_frame.png",
     "price": 65,
     "size": "12\" x 10\"",
     "description": "A beautiful new frame design",
     "specs": {
       "frameSize": 1000,
       "canvasSize": 400,
       "transparentWidth": 700,
       "transparentHeight": 600,
       "transparentX": 150,
       "transparentY": 200
     },
     "exampleImage": "assets/frames/example_my_new_frame.png",
     "category": "modern"
   }
   ```

4. **添加到frames数组**
   - 将新配置添加到 `frames` 数组中

## 如何修改现有相框

1. 在 `frames` 数组中找到要修改的相框
2. 修改相应字段
3. 保存文件
4. 刷新浏览器查看更改

## 如何删除相框

1. 从 `frames` 数组中删除相框配置
2. 可选择性地删除对应的图片文件

## 注意事项

- **文件名**: 确保 `filename` 与实际图片文件名完全匹配
- **规格测量**: 透明区域坐标必须准确，否则照片位置会偏移
- **JSON格式**: 确保JSON格式正确，可以使用JSON验证工具检查
- **缓存**: 修改配置后可能需要清除浏览器缓存才能看到更改

## 故障排除

### 相框不显示
- 检查JSON格式是否正确
- 确认图片文件路径正确
- 查看浏览器控制台是否有错误

### 照片位置偏移
- 重新测量透明区域坐标
- 检查 `transparentX` 和 `transparentY` 值

### 页面加载失败
- 检查 `frameConfig.js` 是否正确加载
- 确认 `frames.json` 文件路径正确

## 技术支持

如果遇到问题，请检查：
1. 浏览器控制台错误信息
2. 网络请求是否成功加载配置文件
3. JSON格式是否正确
