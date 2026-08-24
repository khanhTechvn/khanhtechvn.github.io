"use strict";

/* =========================================
   KHANHTECH ACCOUNT FRONTEND
========================================= */

const registerForm =
    document.getElementById("registerForm");

const loginForm =
    document.getElementById("loginForm");

const registerMessage =
    document.getElementById("registerMessage");

const loginMessage =
    document.getElementById("loginMessage");


function showMessage(
    element,
    message,
    type
) {

    if (!element) return;

    element.textContent =
        message;

    element.className =
        `account-message show ${type}`;
}


/* =========================================
   REGISTER
========================================= */

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name")
                    .value
                    .trim();

            const email =
                document.getElementById("email")
                    .value
                    .trim();

            const password =
                document.getElementById("password")
                    .value;

            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;

            const terms =
                document.getElementById("terms")
                    .checked;


            if (password.length < 8) {

                showMessage(
                    registerMessage,
                    "Mật khẩu phải có ít nhất 8 ký tự.",
                    "error"
                );

                return;
            }


            if (password !== confirmPassword) {

                showMessage(
                    registerMessage,
                    "Mật khẩu nhập lại không khớp.",
                    "error"
                );

                return;
            }


            if (!terms) {

                showMessage(
                    registerMessage,
                    "Bạn cần đồng ý với điều khoản.",
                    "error"
                );

                return;
            }


            /*
             * Chưa gửi dữ liệu lên server.
             *
             * Khi có backend:
             *
             * POST /api/auth/register
             */

            console.log({
                name,
                email
            });


            showMessage(
                registerMessage,
                "Giao diện đăng ký đã hoạt động. Backend chưa được kết nối.",
                "success"
            );

        }
    );
}


/* =========================================
   LOGIN
========================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const email =
                document.getElementById("email")
                    .value
                    .trim();

            const password =
                document.getElementById("password")
                    .value;


            if (!email || !password) {

                showMessage(
                    loginMessage,
                    "Vui lòng nhập đầy đủ thông tin.",
                    "error"
                );

                return;
            }


            /*
             * Backend sẽ xử lý:
             *
             * POST /api/auth/login
             */

            console.log({
                email
            });


            showMessage(
                loginMessage,
                "Giao diện đăng nhập đã hoạt động. Backend chưa được kết nối.",
                "success"
            );

        }
    );
}
