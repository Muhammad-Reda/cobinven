function Input({
    label,
    register,
    htmlFor,
    type,
    name,
    id,
    placeholder,
    required,
    errors,
    onChange,
}) {
    return (
        <>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    id={id}
                    {...register(name, { required })}
                    className="peer placeholder-transparent h-14 w-full border-b-2 mb-4 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <label
                    htmlFor={htmlFor}
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-1.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                    {label}
                </label>
                {errors[name] && (
                    <span className=" text-red-500">
                        Jangan biarkan {label} kosong
                    </span>
                )}
            </div>
        </>
    );
}

export default Input;
