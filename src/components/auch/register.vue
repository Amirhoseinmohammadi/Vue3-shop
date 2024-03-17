<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Flowbite
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            v-if="!LogIn"
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create and account
          </h1>
          <h1
            v-else
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Login to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
            <div v-if="!LogIn">
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your Name</label
              >
              <input
                type="name"
                name="name"
                v-model="form.meta.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                type="email"
                name="email"
                v-model="form.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                v-model="form.password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div class="ml-3 text-sm">
                <label
                  for="terms"
                  v-if="!LogIn"
                  class="font-light text-gray-500 dark:text-gray-300"
                  >I accept the
                  <a
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                    >Terms and Conditions</a
                  ></label
                >
                <label
                  for="terms"
                  v-else
                  class="font-light text-gray-500 dark:text-gray-300"
                  >Remember me
                  <router-link
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    to="/forgotPassword"
                    >Forget password?</router-link
                  >
                  <span></span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <span v-if="!LogIn"> Create an account</span>
              <span v-else> Log In </span>
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              <span v-if="!LogIn">Already have an account?</span>
              <span v-else>Dont have an account?</span>

              <button
                type="button"
                @click="LogIn = !LogIn"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                <span v-if="!LogIn">Login here</span>
                <span v-else>Create an account</span>
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import useAuthUser from "../../composable/UseAuthUser";
import { useRouter } from "vue-router";

const router = useRouter();
const { register, loginWithSocialProvider, login } = useAuthUser();

const form = ref({
  meta: { name: "" },
  email: "",
  password: "",
});

const LogIn = ref(false);

const handleSubmit = async () => {
  try {
    if (!!login) {
      await login(form.value);
      router.push({
        name: "Profile",
      });
    } else {
      await register(form.value);
      router.push({
        name: "EmailConfirmation",
        query: { email: form.value.email },
      });
    }
  } catch (error) {
    alert(error.message);
  }
};
</script>

<style lang="less" scoped></style>
