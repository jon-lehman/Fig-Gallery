<script>
    import { writable } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import firebase from 'firebase/app';
    import 'firebase/database';

    export let data = undefined;

    let fireDataBase = firebase.database().ref()
    fireDataBase.on("value", function(snapshot) {
        data = snapshot.val();
        dispatch('dataLoaded');
    })

    $: if (data) {
        fireDataBase.set(data)
    }
</script>