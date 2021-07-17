<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let showCustomUrlModal = false;
    function toggleModal() {
        showCustomUrlModal = false;
    }

    let urlType = "image"
    let url = ""

    function submitCustomUrl(){
        dispatch('castUrl', {
            urlType: urlType,
            url: url
        })
        toggleModal();
    }
</script>

<style>
    input:checked + span {
        color: #1D4ED8;
    }
</style>

{#if showCustomUrlModal}
    <div class="fixed w-full h-full flex justify-center items-center z-30 pointer-events-none	">
        <div class="w-full max-w-md p-8 m-8 space-y-8 bg-white rounded-lg shadow-xl pointer-events-auto	">

            <div class="flex flex-col space-y-6">
                <label class="inline-flex items-center mt-3">
                    <input type="radio" name="urlType" bind:group={urlType} value={"image"} class="form-radio h-5 w-5 text-blue-600" checked><span class="ml-2 font-medium">Image</span>
                </label>
                <label class="inline-flex items-center mt-3">
                    <input type="radio" name="urlType" bind:group={urlType} value={"video"} class="form-radio h-5 w-5 text-blue-600"><span class="ml-2 font-medium">Video</span>
                </label>
                <label class="inline-flex items-center mt-3">
                    <input type="radio" name="urlType" bind:group={urlType} value={"iframe"} class="form-radio h-5 w-5 text-blue-600"><span class="ml-2 font-medium">Website (iframe)</span>
                </label>
                <label class="inline-flex items-center mt-3">
                    <input type="radio" name="urlType" bind:group={urlType} value={"sketchfab"} class="form-radio h-5 w-5 text-blue-600"><span class="ml-2 font-medium">Sketchfab</span>
                </label>
            </div>

            <input type="url" name="url" bind:value={url} required class="w-full border border-gray-200 rounded placeholder-gray-400" placeholder="url">

            <button type="button" name="urlSubmit" on:click="{submitCustomUrl}" class="w-full py-2 border border-gray-200 align-center">Cast</button>
            
        </div>
    </div>
    <div on:click="{toggleModal}" class="fixed h-full w-screen flex bg-gray-900 opacity-75 z-20"></div>
{/if}