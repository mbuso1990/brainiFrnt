// screens/PaymentScreen.js
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentScreen = () => {
  const webViewRef = useRef(null);

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    console.log(`Navigated to URL: ${url}`);

    if (url.includes('about:blank')) {
      console.log('Payment result page reached, injecting JavaScript to read screen content...');
      webViewRef.current.injectJavaScript(`
        (function() {
          try {
            const bodyText = document.body.innerText || '';
            console.log('Body Text:', bodyText); // Log the full body text for debugging
            
            let status = 'Payment status unknown';

            // Check for specific text in the body
            if (bodyText.includes('Payment successful')) {
              status = 'Payment successful';
            } else if (bodyText.includes('Payment failed')) {
              status = 'Payment failed';
            } else if (bodyText.includes('unsuccessful')) {
              status = 'Payment unsuccessful';
            }

            // Loop through all elements to check for specific text
            const allElements = document.body.getElementsByTagName('*');
            for (let i = 0; i < allElements.length; i++) {
              const element = allElements[i];
              if (element.innerText && element.innerText.includes('unsuccessful')) {
                status = 'Payment unsuccessful';
                break;
              }
            }

            window.ReactNativeWebView.postMessage(status);
          } catch (error) {
            window.ReactNativeWebView.postMessage('Error reading payment status: ' + error.message);
          }
        })();
      `);
    }
  };

  const handleMessage = (event) => {
    const message = event.nativeEvent.data;
    console.log(`Message from WebView: ${message}`);
    if (message === 'Payment successful') {
      // Handle payment success
      console.log('Payment was successful!');
    } else if (message === 'Payment failed' || message === 'Payment unsuccessful') {
      // Handle payment failure
      console.log('Payment failed or was unsuccessful!');
    } else {
      console.log('Unknown payment status.');
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body, html {
          height: 100%;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2em;
        }
        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 80%;
          max-width: 400px;
        }
        table {
          width: 100%;
        }
        input[type="image"] {
          width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
      <form name="PayFastPayNowForm" action="https://payment.payfast.io/eng/process" method="post">
        <input required type="hidden" name="cmd" value="_paynow">
        <input required type="hidden" name="receiver" pattern="[0-9]" value="23914842">
        <input type="hidden" name="return_url" value="http://192.168.43.59:5000/return">
        <input type="hidden" name="cancel_url" value="http://192.168.43.59:5000/cancel">
        <input type="hidden" name="notify_url" value="http://192.168.43.59:5000/api/payment/notify">
        <input required type="hidden" name="amount" value="250">
        <input required type="hidden" name="item_name" maxlength="255" value="Interactive Quizzes for Kids">
        <input type="hidden" name="item_description" maxlength="255" value="Engage your child with fun and educational quizzes designed to enhance their learning experience. Suitable for ages 4-7.">
        <input required type="hidden" name="subscription_type" pattern="1" value="1">
        <input type="hidden" name="recurring_amount" value="100">
        <input required type="hidden" name="cycles" pattern="[0-9]" value="0">
        <input required type="hidden" name="frequency" pattern="[0-9]" value="3">
        <table>
          <tr>
            <td colspan=2 align=center>
              <input type="image" src="https://my.payfast.io/images/buttons/Subscribe/Primary-Large-Subscribe.png" alt="Subscribe" title="Subscribe with Payfast">
            </td>
          </tr>
        </table>
      </form>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={handleMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PaymentScreen;
