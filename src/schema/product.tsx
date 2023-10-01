import * as yup from "yup";
export const schemaAddProduct = yup.object({
    name: yup.string().min(3, "Tối thiểu 3 kí tự").required("Tên không được để trống"),
    price: yup.number().min(0, "Giá không được nhỏ hơn 0").required("Giá không được để trống"),
    orinal_price: yup.number().min(0, "Giá không được nhỏ hơn 0").required("Giá không được để trống"),
    image: yup.string(),
    description: yup.string().min(30, "Tối thiểu 30 kí tự"),
})
export type AddForm = yup.InferType<typeof schemaAddProduct>