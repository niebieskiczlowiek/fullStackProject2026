import { signUpSchema, signUpValues } from "@/lib/validations/auth";
import { useAuth } from "@/providers/root-provider";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Field, FieldGroup, FieldSet } from "./ui/field";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface SignUpFormProps {
    footer: (props: { isSubmitting: boolean }) => React.ReactNode;
    callback?: () => void;
}

const SignUpForm = ({
    footer,
    callback
}: SignUpFormProps) => {
    const { signUp } = useAuth();
    const form = useForm<signUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        },
        mode: "onSubmit"
    });

    const { register, formState: { errors, isSubmitting }} = form;

    return (
        <form onSubmit={form.handleSubmit(async (data) => {
            await signUp(data);
            if (callback) callback();
        })}>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <Label htmlFor="first_name">Name</Label>
                        <Input
                            {...register("first_name")}
                            id="first_name"
                            aria-invalid={errors.first_name ? "true" : "false"}
                            className={errors.first_name ? "border-red-500": ""} 
                        />
                        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="last_name">Surname</Label>
                        <Input
                            {...register("last_name")}
                            id="last_name"
                            aria-invalid={errors.last_name ? "true" : "false"}
                            className={errors.last_name ? "border-red-500": ""} 
                        />
                        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            {...register("email")}
                            id="email"
                            aria-invalid={errors.email ? "true" : "false"}
                            className={errors.email ? "border-red-500": ""} 
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="username">Username</Label>
                        <Input 
                            {...register("username")} 
                            id="username"
                            aria-invalid={errors.username ? "true" : "false"}
                            className={errors.username ? "border-red-500": ""} 
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            {...register("password")} 
                            type="password" 
                            id="password"
                            aria-invalid={errors.password ? "true" : "false"}
                            className={errors.password ? "border-red-500": ""} 
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <Input 
                            {...register("confirmPassword")} 
                            type="password" 
                            id="confirmPassword"
                            aria-invalid={errors.password ? "true" : "false"}
                            className={errors.password ? "border-red-500": ""} 
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </Field>
                </FieldGroup>
                {footer({ isSubmitting })}
            </FieldSet>
        </form>
    );
}

export default SignUpForm;