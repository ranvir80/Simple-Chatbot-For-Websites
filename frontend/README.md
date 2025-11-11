# 🚀 Lumo Chatbot - Website Embed

Easily embed Lumo chatbot on any website with a single line of code!

## 📦 Quick Embed

Add this script tag to your HTML file, just before the closing `</body>` tag:

```html
<script defer src="https://cdn.jsdelivr.net/gh/ranvir80/ranvir80@latest/bot.js"></script>
```

That's it! The chatbot will automatically appear on your website.

## 🎨 Demo

Check out the live demo at: **[www.ranvirpardeshi.me](https://www.ranvirpardeshi.me)**

## 📋 Installation Steps

### Option 1: Using CDN (Recommended)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <!-- Your website content here -->
    
    <!-- Add chatbot - place before closing body tag -->
    <script defer src="https://cdn.jsdelivr.net/gh/ranvir80/ranvir80@latest/bot.js"></script>
</body>
</html>
```

### Option 2: Self-Hosted

1. Download `bot.js` from this repository
2. Add it to your project's `assets` or `js` folder
3. Include in your HTML:

```html
<script defer src="/path/to/bot.js"></script>
```

## ⚙️ Configuration

The chatbot works out of the box with default settings. The backend API endpoint is pre-configured in the script.

### Default Settings
- **API Endpoint**: `https://ranvirwebbot.onrender.com/api/chat`
- **Position**: Bottom-left corner
- **Theme**: Dark mode
- **Storage**: Uses localStorage for chat history

## 🎯 Features

- ✅ **Zero configuration** - Just add the script tag
- ✅ **Responsive design** - Works on desktop and mobile
- ✅ **Chat history** - Remembers conversations
- ✅ **User registration** - Collects name and email on first use
- ✅ **Floating messages** - Eye-catching notifications
- ✅ **Dark theme** - Modern, sleek design
- ✅ **Lightweight** - Fast loading, minimal impact on page speed
- ✅ **AI-powered** - Intelligent responses about Ranvir Pardeshi and his projects

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Advanced Usage

### Custom Styling

The chatbot uses scoped CSS classes. You can override styles by adding your own CSS:

```css
/* Example: Change chatbot button color */
.chatbot-button {
    background: #your-color !important;
}

/* Example: Change position to bottom-right */
.chatbot-button-wrapper {
    left: auto !important;
    right: 20px !important;
}
```

### Multiple Pages

The script works across all pages when included in your site's template/layout file. Each user's chat history is preserved across page navigation.

## 🛠️ Technical Details

- **Framework**: Vanilla JavaScript (no dependencies)
- **Storage**: localStorage API
- **API**: RESTful endpoints
- **Security**: Input validation, XSS protection
- **Performance**: Lazy-loaded, non-blocking script

## 📞 Support

For issues or questions:
- **Developer**: Ranvir Pardeshi
- **Portfolio**: [www.ranvirpardeshi.me](https://www.ranvirpardeshi.me)
- **GitHub**: [github.com/ranvir80](https://github.com/ranvir80)

## 📄 License

This chatbot is part of Lumo Chatbot API project by Ranvir Pardeshi.

---

Made with ❤️ by Ranvir Pardeshi
