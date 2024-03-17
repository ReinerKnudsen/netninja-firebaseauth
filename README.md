This in an updated coed repository for [iamshaunjp](https://github.com/iamshaunjp)'s [YouTube video series about Filebase Auth](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ).
The original [repository](https://github.com/iamshaunjp/firebase-auth) needed updates becasue especially the Firebase syntax has changed a lot since the video series was published. So I went and did some research on how to change the function calls to make this great tutorial work today.

The YouTuBe series is still a fantastic piece of work by Shaun.

This repository works with Firebase 10.8. as of 2024-03-17.

I realized too 

## Important 
- I couldn't transfer most changes in the Firebase logic 1:1. Yet the code in this respository works exactly as in the original.
- Using [Cloud Functions](https://firebase.google.com/docs/functions) in Firebase has since become a paid feature; the tiers are very generous, though.
- All my code went into a 'firebase.js'rather than a 'auth.js' - don't ask me why.
- To meet new JavaScript requirements I chose a module approach. You will find 'import' and 'export' functions which you didn't see in Shaun's videos.
- The syntax for the Firebase Cloud Functions works without any changes
- I moved all inline styles from the HTML file to the styles.css file

# How to use
1. Clone the repo
2. Run `npm i` in the repo's root
3. Make sure you have Firebase initialized for your purposes
4. Add your Firebase credentials to the `firebase.js`
   

Thanks to [iamshaunjp](https://github.com/iamshaunjp) for all his dedicated work.

  
