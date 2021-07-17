<script>
  import Controller from './Controller.svelte'
  import Frame from './Frame.svelte'

  import firebase from 'firebase/app';
  const firebaseConfig = {
    apiKey: "AIzaSyAiCQby9fgvoDefSRHKpPc2Qe4vzIfJaRU",
    authDomain: "office-figallery.firebaseapp.com",
    projectId: "office-figallery",
    storageBucket: "office-figallery.appspot.com",
    messagingSenderId: "629005007950",
    appId: "1:629005007950:web:3b1170cc6b96f424c0171f"
  }
  firebase.initializeApp(firebaseConfig);

  let url = window.location.href;
  let page = url ? url.split('?')[1] : window.location.search.slice(1);
  $: console.log(page)
</script>

{#if page === "frame1"}
  <Frame frameID={1} />
{:else if page === "frame2"}
  <Frame frameID={2} />
{:else if page === "frame3"}
  <Frame frameID={3} />
{:else}
  <Controller />
{/if}



