import React from "react";
import { useState } from "react";
const ValidationOnSubmitcontrl = () => {
	const userData = { name: "", surname: "", email: "", age: "", gender: "" };

	const [formValues, setFormValues] = useState(userData);
	const [formErrors, setFormErrors] = useState({});
	const [onSubmit, setOnSubmit] = useState(false);
	const [userList, setUserList] = useState([]);
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};
	const handleOnSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setOnSubmit(true);
        console.log(formValues)
		setUserList((prevUserList) => {
			return [...prevUserList, { ...formValues, id: new Date().toString() }];
		});
	};
	const validate = (values) => {
		const errors = {};
		if (!values.name) {
			errors.name = "Name is required";
		} else if (values.name.length < 4) {
			errors.name = "Name must contain minimum four symbol";
		}
		if (!values.surname) {
			errors.surname = "Surname is required";
		} else if (values.surname.length < 4) {
			errors.surname = "Surname must contain minimum four symbol";
		}
		if ( values.email &&!values.email.includes("@gmail.com")) {
			errors.email = "This is not a valid email format";
		}
		if ( values.age && values.age < 18) {
			errors.age = "Age must be 18+";
		} 
		if (!values.gender) {
			errors.gender = "Gender is required";
		}
		return errors;
	};
	return (
		<div>
			<form onSubmit={handleOnSubmit}>
				<h1>Login Form</h1>
				<div>
                    <div>
                    <label style={{color:"green"}}>Name</label>
                    </div>
					<input
						type="text"
						name="name"
						value={formValues.name}
						onChange={handleOnChange}
						placeholder="enter your name"
					/>
				</div>
				<h4 style={{color:"red"}}>{formErrors.name && <p>{formErrors.name}</p>}</h4>
				<div>
                <div>
                    <label style={{color:"green"}}>Surname</label>
                    </div>
					<input
						type="text"
						name="surname"
						value={formValues.surname}
						onChange={handleOnChange}
						placeholder="enter your surname"
					/>
				</div>
				<h4 style={{color:"red"}}>{formErrors.surname && <p>{formErrors.surname}</p>}</h4>
				<div>
                <div>
                    <label style={{color:"green"}}>Email</label>
                    </div>
					<input
						type="text"
						name="email"
						value={formValues.email}
						onChange={handleOnChange}
						placeholder="enter your email"
					/>
				</div>
				<h4 style={{color:"red"}}>{formErrors.email && <p>{formErrors.email}</p>}</h4>
				<div>
                <div>
                    <label style={{color:"green"}}>Age</label>
                    </div>
					<input
						type="number"
						name="age"
						value={formValues.age}
						onChange={handleOnChange}
						placeholder="enter your age"
					/>
				</div>
				<h4 style={{color:"red"}}>{formErrors.age && <p>{formErrors.age}</p>}</h4>
				<div>
                <div>
                    <label style={{color:"green"}}>Gender</label>
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
				<h4 style={{color:"red"}}>{formErrors.gender && <p>{formErrors.gender}</p>}</h4>
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
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default ValidationOnSubmitcontrl;