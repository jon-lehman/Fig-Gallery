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
        
        // Initialize 4th frame if it doesn't exist
        if (data && data.frames && data.frames.length === 3) {
            data.frames.push({
                id: 4,
                source: {
                    type: "figma",
                    content: "alpha"
                },
                adjustments: {
                    brightness: 100,
                    contrast: 100,
                    grayScale: 0,
                    hueRotate: 0,
                    saturation: 100,
                    invert: 0
                }
            });
        }
        
        dispatch('dataLoaded');
    })

    $: if (data) {
        fireDataBase.set(data)
    }
</script>