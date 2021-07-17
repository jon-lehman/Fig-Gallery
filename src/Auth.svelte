<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
  
    const auth = firebase.auth();
    let user = null;
    export let useRedirect = false;
  
    // small mapper function
    const userMapper = claims => ({
      id: claims.user_id,
      name: claims.name,
      email: claims.email,
      picture: claims.picture
    });
  
    export const loginWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      if (useRedirect) {
        return auth.signInWithRedirect(provider);
      } else {
        return auth.signInWithPopup(provider);
      }
    };
  
    export const logout = () => auth.signOut();
  
    auth.onAuthStateChanged(async fireUser => {
        if (fireUser) {
            if (fireUser.email === "info@jonlehman.me") {
                const token = await fireUser.getIdTokenResult();
                user = userMapper(token.claims);
            }
            else {
                user = null
            }
        } else {
            user = null;
        }
    });
  
    // reactive helper variable
    $: loggedIn = user !== null;
  </script>
  
  <!-- we will expose all required methods and properties on our slot -->
  <div>
    <slot {user} {loggedIn} {loginWithGoogle} {logout} />
  </div>