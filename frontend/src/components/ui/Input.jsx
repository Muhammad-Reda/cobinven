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
            <div className="col-span-2">
                <label
                    htmlFor={htmlFor}
                    className=" text-left block mb-2 mt-2 text-sm font-medium text-gray-900 "
                >
                    {label}
                </label>
                <input
                    type={type}
                    name={name}
                    id={id}
                    {...register(name, { required })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder={placeholder}
                    onChange={onChange}
                />
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
