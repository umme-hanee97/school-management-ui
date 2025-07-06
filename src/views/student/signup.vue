<template>
  <div class="item-center w-1/3 m-auto mt-10 shadow-2xl rounded-lg p-10">
    <div class="w-5/6 m-auto space-y-4">
      <fwb-Input
        label="Name"
        input-class="bg-slate-50 border border-sky-200 rounded-md text-black"
        placeholder="Enter Your Name"
      />
      <fwb-Input
        label="Email"
        input-class="bg-slate-50 border border-sky-200 rounded-md text-black"
        placeholder="Enter Your Email"
      />
      <div>
        <label class="text-sm font-semibold">Class</label><br />
        <select
          class="focus:ring-sky-200 w-full bg-slate-50 border border-sky-300 rounded-md"
        >
          <option selected disabled>Select One</option>
          <option v-for="(value, key) in classes" :key="key">
            {{ value.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="text-sm font-semibold">Section</label><br />
        <select
          class="focus:ring-sky-200 w-full bg-slate-50 border border-sky-300 rounded-md"
        >
          <option selected disabled>Select One</option>
          <option v-for="(value, key) in sections" :key="key">
            {{ value.name }}
          </option>
        </select>
      </div>
      <fwb-Input
        type="number"
        label="Roll No."
        input-class="bg-slate-50 border border-sky-200 rounded-md text-black"
        placeholder="Enter Your Roll No"
      />
      <div>
        <label class="text-sm font-semibold">Photo</label>
        <fwb-file-input dropzone input-class="bg-slate-50 border border-sky-200 rounded-md text-black"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FwbSelect, FwbInput, FwbFileInput } from "flowbite-vue";

const classes = [
  { value: "1", name: "One" },
  { value: "2", name: "Two" },
  { value: "3", name: "Three" },
];
const sections = [
  { value: "1", name: "Orange" },
  { value: "2", name: "Grape" },
  { value: "3", name: "Watermelon" },
];
</script>

<style>
</style>