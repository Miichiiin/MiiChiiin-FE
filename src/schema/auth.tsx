import * as yup from 'yup';
export const schemaSignUp = yup.object({
    name: yup.string().required("Trường dữ liệu bắt buộc"),
    email: yup.string().email("Email không đúng định dạng").required("Trường dữ liệu bắt buộc"),
    password: yup.string().min(6, "Tối đa 6 kí tự").typeError("Tối thiểu 6 kí tự").required("Trường dữ liệu bắt buộc"),
    confilmPassWord: yup.string().oneOf([yup.ref("password")], "Mật khẩu không trùng khớp").required("Trường dữ liệu bắt buộc"),
})
export const schemaSignIn = yup.object({
    email: yup.string().email("Email không đúng định dạng").required("Trường dữ liệu bắt buộc"),
    password: yup.string().min(5, "Tối đa 6 kí tự").typeError("Mật khẩu tối đa 6 kí tự").required("Trường dữ liệu bắt buộc"),
})
export type SigninForm = yup.InferType<typeof schemaSignIn>
export type SignupForm = yup.InferType<typeof schemaSignUp>