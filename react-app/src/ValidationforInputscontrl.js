import React from "react";
import { useState, useEffect } from "react";

const ValidationforInputscontrl = () => {
	const [formValues, setFormValues] = useState({
		name: "",
		surname: "",
		email: "",
		age: "",
		gender: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [isFormValid, setFormValid] = useState(false);
	const [userList,setUserList] = useState([])
	const [userUpdate, setUserUpdate] = useState(false);
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};
	const handleOnSubmit = (e) => {
		e.preventDefault();
		console.log("submitted", formValues);
		if(userUpdate) {
			const userIndex = userList.findIndex((user) => user.id === formValues.id);
			const newUserList = [...userList];
			newUserList[userIndex] = formValues;
			setUserList(newUserList);}
		else {setUserList( (prevUserList) =>{
			return [...prevUserList,{...formValues, id: new Date().toString()}]
		})
	}
	setFormValues({
		name: "",
		surname: "",
		email: "",
		age: "",
		gender: "",
	});
	setUserUpdate(false)
	};

	useEffect(() => {
		const validationResult = validate(formValues);
		setFormErrors(validationResult);
		if (
			formValues.name &&
			!validationResult.name &&
			formValues.surname &&
			!validationResult.surname &&
			formValues.age &&
			!validationResult.age &&
			formValues.email &&
			validationResult.email &&
			formValues.gender &&
			!validationResult.gender
		) {
			setFormValid(true);
		}
	}, [formValues]);

	const validate = (values) => {
		const errors = {};
		if (values.name && values.name.length < 4) {
			errors.name = "Name must contain minimum four symbol";
		}
		if (values.surname && values.surname.length < 4) {
			errors.surname = "Surname must contain minimum four symbol";
		}
		if (values.email && !values.email.includes("@gmail.com")) {
			errors.email = "This is not a valid email format";
		}
		if (values.age && values.age < 18) {
			errors.age = "Age must be 18+";
		}
		if (!values.gender) {
			errors.gender = "Gender is required";
		}
		return errors;
	};
	const update = (id) => {
		const user = userList.find((user) => user.id === id);
        setFormValues({
            name: user.name,
            surname: user.surname,
            email: user.email,
            age: user.age,
            gender: user.gender,
            id: id
        })
	};
	return (
		<div>
			<form onSubmit={handleOnSubmit}>
				<h1>Login Form</h1>
				<div>
					<div>
						<label style={{ color: "green" }}>Name</label>
					</div>
					<input
						type="text"
						name="name"
						value={formValues.name}
						onChange={handleOnChange}
						placeholder="enter your name"
					/>
				</div>

				{formErrors.name && <p>{formErrors.name}</p>}

				<div>
					<div>
						<label style={{ color: "green" }}>Surname</label>
					</div>
					<input
						type="text"
						name="surname"
						value={formValues.surname}
						onChange={handleOnChange}
						placeholder="enter your surname"
					/>
				</div>

				{formErrors.surname && <p>{formErrors.surname}</p>}

				<div>
					<div>
						<label style={{ color: "green" }}>Email</label>
					</div>
					<input
						type="text"
						name="email"
						value={formValues.email}
						onChange={handleOnChange}
						placeholder="enter your email"
					/>
				</div>

				{formErrors.email && <p>{formErrors.email}</p>}

				<div>
					<div>
						<label style={{ color: "green" }}>Age</label>
					</div>
					<input
						type="number"
						name="age"
						value={formValues.age}
						onChange={handleOnChange}
						placeholder="enter your age"
					/>
				</div>

				{formErrors.age && <p>{formErrors.age}</p>}

				<div>
					<div>
						<label style={{ color: "green" }}>Gender</label>
					</div>
					<input
						onChange={handleOnChange}
						type="radio"
						name="gender"
						value="male"
					/>
					Male
					<input
						onChange={handleOnChange}
						type="radio"
						name="gender"
						value="female"
					/>
					Female
				</div>

				{formErrors.gender && <p>{formErrors.gender}</p>}
				<button>Submit</button>
			</form>
			<button>Delete User</button>
			<button>Update User</button>
			{userList.map((user) => {
            return (
            <React.Fragment key={user.id}>
                <h1> username- {user.name}</h1>
                <h1> surname-{user.surname}</h1>
                <h1> email- {user.email}</h1>
                <h1>age-{user.age}</h1>
                <h1> gender-{user.gender}</h1>
				<button onClick={() => {update(user.id);setUserUpdate(true)}}>Update User</button>
            </React.Fragment>
            )
        })}
		</div>
	);
};

export default ValidationforInputscontrl;
