import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <Label>Pilih jenis akun</Label>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Petani */}
                                <label className="cursor-pointer">
                                    <input type="radio" name="role" value="petani" className="peer hidden" />
                                    <div className="rounded-lg border p-4 text-center transition peer-checked:border-green-500 hover:bg-muted">
                                        <div className="font-semibold">🌱 Petani</div>
                                        <div className="text-sm text-muted-foreground">Mitra Produktif</div>
                                    </div>
                                </label>

                                {/* Penjual */}
                                <label className="cursor-pointer">
                                    <input type="radio" name="role" value="penjual" className="peer hidden" />
                                    <div className="rounded-lg border p-4 text-center transition peer-checked:border-green-500 hover:bg-muted">
                                        <div className="font-semibold">🛒 Penjual</div>
                                        <div className="text-sm text-muted-foreground">Mitra Non Produktif</div>
                                    </div>
                                </label>
                            </div>
                            <InputError message={errors.role} />
                        </div>

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Bussiness Name</Label>
                                <Input
                                    id="bussiness_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="bussiness_name"
                                    name="bussiness_name"
                                    placeholder="Bussiness name or Company name"
                                />
                                <InputError message={errors.bussiness_name} className="mt-2" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Address</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="address"
                                    name="address"
                                    placeholder="Address or Location"
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button type="submit" className="mt-2 w-full" tabIndex={5}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
