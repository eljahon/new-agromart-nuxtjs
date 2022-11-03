<template>
  <div>
    <div>
      <p class="text-gray-500 text-sm">
        Ijtimoiy tarmoqlar orqali kiring
      </p>
    </div>
    <div class="mt-3 grid grid-cols-3 gap-3">
      <div>
        <a target="_blank" href="https://id.gov.uz/cmn/LoginPage.do" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-blue-50 hover:text-blue-500 hover:shadow-md">
          <span class="sr-only">Sign in with OneId</span>
          One ID
        </a>
      </div>

      <div class="icon-google">
        <a href="#" class=" w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-blue-50 hover:shadow-md">
          <span class="sr-only">Sign in with Google</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            style="fill:rgba(115, 121, 135, 1);transform:;-ms-filter:"
          >
            <path d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28 c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233 c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934 C20.485,11.453,20.404,10.884,20.283,10.356z" />
          </svg>
        </a>
      </div>

      <div class="icon-facebook">
        <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-blue-50 hover:shadow-md">
          <span class="sr-only">Sign in with Facebook</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            style="fill:rgba(115, 121, 135, 1);transform:;-ms-filter:"
          ><path d="M12.001,2.002c-5.522,0-9.999,4.477-9.999,9.999c0,4.99,3.656,9.126,8.437,9.879v-6.988h-2.54v-2.891h2.54V9.798 c0-2.508,1.493-3.891,3.776-3.891c1.094,0,2.24,0.195,2.24,0.195v2.459h-1.264c-1.24,0-1.628,0.772-1.628,1.563v1.875h2.771 l-0.443,2.891h-2.328v6.988C18.344,21.129,22,16.992,22,12.001C22,6.479,17.523,2.002,12.001,2.002z" /></svg>
        </a>
      </div>
    </div>
    <div class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="bg-white text-xs border rounded-full px-2 text-gray-500">
            Yoki
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Socials'
}
</script>

<style scoped>
    .icon-facebook:hover path {
        fill: #0369A1;
        transition: all ease 0.3s;
    }
    .icon-google:hover path {
        fill: #E14032;
        transition: all ease 0.3s;
    }
</style>
