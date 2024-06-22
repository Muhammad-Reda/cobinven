function Input({ label, htmlFor, type, name, id, placeholder, required }) {
    return (
        <>
            <div className="col-span-2">
                <label
                    htmlFor={htmlFor}
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    {label}
                </label>
                <input
                    type={type}
                    name={name}
                    id={id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder={placeholder}
                    required={required}
                />
            </div>
        </>
    );
}

export default Input;
