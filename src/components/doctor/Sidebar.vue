<template>
    <nav class="h-full flex-col justify-between overflow-y-auto p-4 rounded-[32px] border-gray-100 border-[1px] font-[14px] text-[#5f6a61]">
        <div class="py-4">
            <div class="mb-8 px-2">
                <img src="../../assets/Page-heading-logo.png" alt=""></img>
            </div>
            <ul class="space-y-2 mt-8 pt-8">
                <li class="h-[44px]">
                    <a href="#"
                        class="flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100  group">

                        <router-link to="/doctor/dashboard"
                            class="text-gray-300 flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100 group">
                            <i class="fa fa-home pr-4"></i> Dashboard</router-link>
                    </a>
                </li>

                <li class="h-[44px]">
                    <a href="#"
                        class="flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100  group">

                        <router-link to="/doctor/dashboard"
                            class="text-gray-700 flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100  group">
                            <i class="fa fa-users pr-4"></i>
                            Patients
                        </router-link>
                    </a>
                </li>

                <li class="h-[44px]">
                    <a href="#"
                        class="flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100 group">

                        <router-link to="/doctor/dashboard"
                            class="text-gray-700 flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100 group">
                            <i class="fa fa-home pr-4"></i> Providers</router-link>
                    </a>
                </li>

                <li class="h-[44px]">
                    <a href="#"
                        class="flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100 group">

                        <router-link to="/doctor/dashboard"
                            class="text-gray-700 flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100 group">
                            <i class="fa fa-home pr-4"></i> System Monitoring</router-link>
                    </a>
                </li>

                <li class="h-[44px]">
                    <a href="#"
                        class="flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100 group">

                        <router-link to="/doctor/dashboard"
                            class="text-gray-700 flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100 group">
                            <i class="fa fa-home pr-4"></i> Compliance</router-link>
                    </a>
                </li>



            </ul>
        </div>

        <div class="pt-32">
                <ul class="pt-4 mt-4 space-y-2 font-medium">
                    <li class="h-[44px]">
                        <a href="#"
                            class="flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#5f6a61] dark:group-hover:text-white"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 17 20">
                                <path
                                    d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                            </svg>
                            <span class="ms-3">Settings</span>
                        </a>
                    </li>
                    <li class="h-[44px]">
                        <a href="#"
                            class="flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <i
                                class="fa fa-users shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#5f6a61] dark:group-hover:text-white"></i>
                            <span class="ms-3">Help And Support</span>
                        </a>
                    </li>
                </ul>
                <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
                    <li>
                        <a href="#"
                            class="flex items-center p-2 text-[#5f6a61] transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <div class="pt-3 flex">
                                <div class="mr-3">
                                    <img class="w-10 h-10 rounded-full"
                                        src="https://images.unsplash.com/photo-1508002366005-75a695ee2d17?fm=jpg"
                                        alt="Rounded avatar"></img>
                                </div>
                                <div>
                                    <h2 class=" text-sm bold">Dr. Evelyn Opara</h2>
                                    <p class=" text-sm">alison@rayna.ui</p>
                                </div>
                            </div>
                        </a>
                    </li>

                </ul>
            </div>
    </nav>
</template>


<script setup></script>

<style scoped></style>