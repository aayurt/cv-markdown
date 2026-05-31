export function exportHtml(previewEl: HTMLElement, title: string): void {
  const html = previewEl.innerHTML;

  const doc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&display=swap">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { display: flex; justify-content: center; min-height: 100vh; background: #f4f4f5; }
</style>
</head>
<body>${html}</body>
</html>`;

  const blob = new Blob([doc], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
