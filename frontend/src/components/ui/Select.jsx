import { Select, Option } from "@material-tailwind/react";

const SelectTemplate = ({
    data,
    register,
    name,
    required,
    errors,
    onChange,
}) => {
    return (
        <div className="w-72">
            <Select
                label="Select Version"
                {...register(name, { required })}
                onChange={onChange(value)}
            >
                {data.map((item) => {
                    <Option value={item.kode}>
                        {item.kode} - {item.nama}
                    </Option>;
                })}
            </Select>
            {errors[name] && (
                <span className=" text-red-500">*{label} required</span>
            )}
        </div>
    );
};

export default Select;
