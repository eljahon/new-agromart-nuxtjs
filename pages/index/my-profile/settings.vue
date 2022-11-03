<template>
  <div>
    <div class="border rounded-md shadow-md p-4 h-auto">
      <div class="text-gray-900 text-lg border-b pb-4 font-medium">
        {{ $t('text.loginSettings') }}
      </div>
      <div class="grid md:grid-cols-3 grid-cols-1 space-y-2 py-4 border-b">
        <div class="text-gray-700 md:col-span-1 col-span-2 w-full font-medium text-base">
          {{ $t('text.phoneNumber') }}
        </div>
        <input type="text" name="full_name" placeholder="+998 88 111 22 33" class="col-span-2 text-sm rounded-md border-gray-300">
        <div class="text-gray-700 md:col-span-1 col-span-2 font-medium text-base">
          {{ $t('word.password') }}*
        </div>
        <input type="password" name="password" placeholder="*******" class="col-span-1 text-sm rounded-md my-3 mr-3 border-gray-300">
        <button class="p-1 flex text-gray-900 h-10 my-3 justify-center items-center rounded-md border-2 border-gray-300">
          <i class="bx bx-edit " />
          <span class="ml-2">{{ $t('text.changePassword') }}</span>
        </button>
        <div class="text-gray-700 font-medium text-base">
          {{ $t('word.email') }}
        </div>
        <input type="email" name="full_name" placeholder="" class="col-span-2 text-sm rounded-md border-gray-300">
      </div>
      <div class="grid grid-cols-1 py-4 border-b">
        <div class="flex items-center justify-between">
          <div class="block">
            <div class="text-gray-900 text-sm mb-1 font-medium">
              {{ $t('text.smsNotification') }}
            </div>
            <div class="text-gray-500 text-sm">
              {{ $t('text.smsTitle') }}
            </div>
          </div>
          <div class="">
            <button type="button" class="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" role="switch" aria-checked="false">
              <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
              <span aria-hidden="true" class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" />
            </button>
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-3 grid-cols-1 pt-4">
        <div class="block">
          <div class="text-gray-900 text-sm mb-1 font-medium">
            {{ $t('text.permanentLang') }}
          </div>
          <div class="text-gray-500 text-sm">
            {{ $t('text.autoLang') }}
          </div>
        </div>
        <div>
          <select class="form-select w-full text-sm border my-5 text-gray-900 py-2 mb-1 border-gray-200 rounded-md focus:outline-none focus:border-gray-300 transition-colors cursor-pointer">
            <option value="man">
              O'zbekcha
            </option>
            <option value="woman">
              Русский
            </option>
            <option value="woman">
              English
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-3 my-5">
      <button class="text-gray-700 font-medium border border-gray-300 rounded-md py-2 px-4">
        {{ $t('word.cancel') }}
      </button>
      <button class="text-white border bg-gray-400 border-gray-300 rounded-md py-2 px-4">
        {{ $t('word.save') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings'
}
</script>
