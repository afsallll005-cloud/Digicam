import "./Input.css"

function Input({ name, type, onChange ,errors}) {
    console.log(errors)
    return (
        <div className="input-group">
            <label htmlFor={name}>{name}</label>
            <input
                type={type}
                name={name}
                placeholder={`Enter Your ${name}`}
                onChange={(e) => onChange(e.target.value, e.target.name)} />
                {errors && errors[name]?
                <p>
                    <small style={{color:"red"}}>
                        {errors[name]}
                    </small>
                </p>:''
                }
        </div>
    )
}

export default Input;