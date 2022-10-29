// import Toast from 'react-native-simple-toast';
import Toast from 'react-native-root-toast';
class messageFunctionsProviders {
    toast(message, position) {



        // var toastPosition = Toast.TOP
        if (position == 'center') {
            console.log('position1', position)
            Toast.show(message, { duration: Toast.durations.SHORT, position: Toast.positions.CENTER, shadow: true, animation: true, hideOnPress: true, delay: 0, });
            //  Toast.showWithGravity(message, Toast.SHORT, toastPosition);
        }
        else if (position == 'top') {
            console.log('position2', position)
            Toast.show(message, { duration: Toast.durations.SHORT, position: Toast.positions.TOP, shadow: true, animation: true, hideOnPress: true, delay: 0, });
            //   Toast.showWithGravity(message, Toast.LONG, Toast.TOP);
        }
        else if (position == 'bottom') {
            Toast.show(message, { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: true, animation: true, hideOnPress: true, delay: 0, });
            //      Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);

        }
        else if (position == 'long') {
            console.log('position3', position)
            Toast.show(message, { duration: Toast.durations.LONG, position: Toast.positions.TOP, shadow: true, animation: true, hideOnPress: true, delay: 0, });
            //       Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
        }

    }
}


class messageClass {
    resend_code = 'OTP sent successfully to your email Id'
    min_favourite_message = 'There should be minimum of 4 Favourites'
    max_favourite_message = 'There should be maximum of 8 Favourites'
    fingerprint_cancel = "User Cancelled fingerprint request"
    fingerprint_unknown = "Fingerprint is not recognized, Try again."
    fingerprint_unavailable = "No fingerprint available add one to continue"
    copied = "Succesfully copied to clipboard"



    // Share Messages
    bankStatement_share_message = 'Highly protected! Please do not share this with anyone'

}


export const msgProvider = new messageFunctionsProviders()
export const message = new messageClass()