export default function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.getElementById(id);
    if (existingScript) {
      resolve();
      return;
    }

    // Create new script element
    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };

    // Append to document head
    document.head.appendChild(script);
  });
}