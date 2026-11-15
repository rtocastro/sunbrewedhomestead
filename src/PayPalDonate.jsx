
import { useEffect, useRef, useState } from 'react';

const CLIENT_ID =
  'BAAoSTbkttoEmQpDW6dH7tYLlY2HO3_7E8uZEptVOzTDqHOkJHcAsNAAEyV0jsE1UIkCl_GwuKImraE7C0';

const HOSTED_BUTTON_ID = '83Q6ZDW7BE8GL';

const SDK_URL =
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}` +
  '&components=hosted-buttons' +
  '&enable-funding=venmo' +
  '&currency=USD';

let sdkPromise = null;

function loadPayPalSDK() {
  if (window.paypal?.HostedButtons) {
    return Promise.resolve();
  }

  if (sdkPromise) {
    return sdkPromise;
  }

  sdkPromise = new Promise((resolve, reject) => {
    let script = document.querySelector(
      'script[data-sunbrewed-paypal]'
    );

    if (!script) {
      script = document.createElement('script');
      script.src = SDK_URL;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.dataset.sunbrewedPaypal = 'true';
    }

    script.addEventListener('load', resolve, { once: true });

    script.addEventListener(
      'error',
      () => {
        sdkPromise = null;
        script.remove();
        reject(new Error('PayPal SDK failed to load'));
      },
      { once: true }
    );

    if (!script.isConnected) {
      document.body.appendChild(script);
    }
  });

  return sdkPromise;
}

export default function PayPalDonate() {
  const containerRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function initializePayPal() {
      try {
        await loadPayPalSDK();

        if (!active || !containerRef.current) return;

        if (!window.paypal?.HostedButtons) {
          throw new Error('PayPal Hosted Buttons unavailable');
        }

        containerRef.current.replaceChildren();

        await window.paypal.HostedButtons({
          hostedButtonId: HOSTED_BUTTON_ID
        }).render(containerRef.current);

      } catch (err) {
        console.error('PayPal error:', err);

        if (active) {
          setError(
            'Unable to load the donation button. ' +
            'Please refresh the page and try again.'
          );
        }
      }
    }

    initializePayPal();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="paypal-donate-wrapper">
      <h2>Support Sunbrewed Homestead</h2>

      <p>
        Your generosity helps support our homestead,
        animal care, and community initiatives.
      </p>

      <div
        id="paypal-container-83Q6ZDW7BE8GL"
        ref={containerRef}
      />

      {error && (
        <p className="paypal-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
