// Console Fallback & Fail-Safe Diagnostic System
// Loaded as a separate module to fully comply with Content Security Policy (no inline scripts)

window.addEventListener('error', function (event) {
  console.error('Agenticum Global Fail-Safe Error Event:', event);
  renderFatalError(
    event.message || 'Unknown evaluation or script error',
    event.filename ? event.filename.split('/').pop() || event.filename : 'bundle',
    event.lineno || 'N/A',
    event.colno || 'N/A',
    event.error && event.error.stack ? event.error.stack : 'No detailed stack trace available.'
  );
});

window.addEventListener('unhandledrejection', function (event) {
  console.error('Agenticum Global Unhandled Rejection Event:', event);
  const reason = event.reason ? (event.reason.stack || event.reason.message || String(event.reason)) : 'No rejection reason specified';
  renderFatalError(
    'Unhandled Promise Rejection: ' + (event.reason?.message || 'Rejection occurred'),
    'async_operation',
    'N/A',
    'N/A',
    reason
  );
});

function renderFatalError(message: string, source: string, line: string | number, col: string | number, stack: string) {
  if (document.getElementById('agenticum-fatal-error')) return;

  const errDiv = document.createElement('div');
  errDiv.id = 'agenticum-fatal-error';
  errDiv.style.position = 'fixed';
  errDiv.style.inset = '0';
  errDiv.style.backgroundColor = '#0b0c10';
  errDiv.style.color = '#c5cbd3';
  errDiv.style.fontFamily = 'monospace';
  errDiv.style.padding = '2rem';
  errDiv.style.zIndex = '9999999';
  errDiv.style.overflow = 'auto';
  errDiv.style.display = 'flex';
  errDiv.style.flexDirection = 'column';
  errDiv.style.alignItems = 'center';
  errDiv.style.justifyContent = 'center';
  errDiv.style.minHeight = '100vh';

  errDiv.innerHTML = `
    <div style="border: 1px solid rgba(255,0,85,0.3); background-color: rgba(255,0,85,0.05); padding: 2rem; border-radius: 12px; max-width: 800px; width: 100%; box-sizing: border-box; text-align: left; display: flex; flex-direction: column; gap: 1rem; border-left: 4px solid #ff0055;">
      <div style="display: flex; align-items: center; gap: 0.75rem; border-bottom: 1px solid rgba(255,0,85,0.15); padding-bottom: 1rem;">
        <span style="width: 10px; height: 10px; border-radius: 50%; background-color: #ff0055; box-shadow: 0 0 10px #ff0055;"></span>
        <h1 style="color: #ffffff; font-size: 1.25rem; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 0.05em;">Agenticum Critical Load Failure</h1>
      </div>
      <p style="font-size: 0.85rem; color: #a0aec0; margin: 0; line-height: 1.5;">
        The application encountered a fatal JavaScript exception during module loading or top-level execution. This is a robust fallback screen to ensure errors are never hidden behind a blank page.
      </p>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <span style="font-size: 0.75rem; color: #718096; font-weight: bold; text-transform: uppercase;">Exception Detail:</span>
        <div style="background-color: #0b0c10; border: 1px solid rgba(255,0,85,0.2); padding: 1rem; border-radius: 6px; font-size: 0.8rem; color: #ff0055; white-space: pre-wrap; word-break: break-all; max-height: 250px; overflow: auto; line-height: 1.4;">
\${message}
Location: \${source}:\${line}:\u200B\${col}

Stack:
\${stack}
        </div>
      </div>
      <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
        <button onclick="window.location.reload(true)" style="background-color: #00ffcc; color: #000000; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; font-size: 0.75rem; font-weight: bold; cursor: pointer; transition: all 0.2s; font-family: inherit; box-shadow: 0 2px 8px rgba(0,255,204,0.25);">
          Force Reload Page
        </button>
      </div>
    </div>
  `;

  if (document.body) {
    document.body.appendChild(errDiv);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(errDiv);
    });
  }
}
