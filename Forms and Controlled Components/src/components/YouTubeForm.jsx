import { useEffect } from "react";
import { useForm,useFieldArray } from "react-hook-form";
const YouTubeForm = () => {
    const form = useForm({
        defaultValues:{
            userName : "Lohith",
            email : "",
            channel : "",
            social : {
                twitter : "",
                facebook : ""
            },
            phoneNumbers : ["",""],
            phNumbers : [{number : ""}],
            age : 0,
            dob : new Date()
        }
    }
        
    );
    const {register,control,handleSubmit,formState,watch,getValues,setValue} = form;
    console.log(formState);
    const {errors,dirtyFields,touchedFields} = formState;
    console.log({dirtyFields,touchedFields})
    const {fields,append,remove} = useFieldArray({
        name : 'phNumbers',
        control
    })
    const onSubmitFn = (data) => {
        console.log("sublitted data ", data);
    }
    // const username = watch("userName");
    useEffect(()=>{
        const subscription = watch((value)=>{
            console.log(value);
        });
        return ()=>subscription.unsubscribe();
    },[watch])

    // geting a form values when clicking a button
    const handleGetValues = () => {
console.log("Get Values", getValues(["userName"]))
    }

    // set value for particular element in form
    const handleSetValue = () => {
        setValue(
            "userName","",
            {
                shouldValidate : true,
                shouldDirty : true,
                shouldTouch : true
            }
        );
    }
 return(

   <div className="container">
    {/* <h2>{username}</h2> */}
      <div className="text">
         YouTubeForm
      </div>
      <form onSubmit={handleSubmit(onSubmitFn)}>
         <div className="form-row">
            <div className="input-data">
               <input 
               type="text" 
               id="userName" 
               {...register("userName",{
                required : {
                    value : true,
                    message : "Username is required"
                }
               })} />
               <div className="underline"></div>
               <label>UserName</label>
               <p className="error">{errors.userName?.message}</p>
            </div>
            
            <div className="input-data">
               <input 
               type="text" 
               id="email" 
               {...register("email",{
                pattern : {
                    value : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                    message : "Invalid email format"
                },
                validate : {
                    notAdmin : (val) => {
                        return(
                            val !== "admin@admin.com" || "Enter a different email address"
                        )
                    },
                    notBlacklisted : (val) =>{
                        return(
                            !val.endsWith("blacklist.com") || "This domain is not supported"
                        )
                    }
                }
               })}/>
               <div className="underline"></div>
               <label >Email</label>
               <p className="error">{errors.email?.message}</p>
            </div>
           
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="text" id="channel" {...register("channel")}/>
               <div className="underline"></div>
               <label >Channel</label>
            </div>
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="text" id="twitter" {...register("social.twitter")}/>
               <div className="underline"></div>
               <label >Twitter</label>
            </div>
            
            
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="text" id="facebook" {...register("social.facebook")}/>
               <div className="underline"></div>
               <label >Facebook</label>
            </div>
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="text" id="primaryPhNum" {...register("phoneNumbers.0")}/>
               <div className="underline"></div>
               <label >Primary Phone Num</label>
            </div>
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="text" id="secondaryPhNum" {...register("phoneNumbers.1")}/>
               <div className="underline"></div>
               <label >Secondary Phone Num</label>
            </div>
         </div>
         <label >List of Phone Numbers</label>
            {
                    fields.map((field,index) => {
                       return(
                        <div className="form-row" key={field.id}>
                            <div className="input-data">
                                <input type="text" id="secondaryPhNum" {...register(`phNumbers.${index}.number`)}/>
                            <div className="underline"></div>
                            {index>0 && 
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                            }
                                {/* <label >List Of Phone Numbers</label> */}
                            </div>
                        </div>
                       )
                    })

            }
            <button type="button" onClick={()=>append({number : ""})}>Add Phone Number</button>
         
            <div className="form-row">
             <div className="input-data">
                <input type="number" id="age" {...register("age",{
                    valueAsNumber : true,
                    required : {
                        value : true,
                        message : "Age is required",
                    }
                })}/>
                <div className="underline"></div>
                <label >Age</label>
                <p className="error">{errors.age?.message}</p>
                </div>
            </div>

            <div className="form-row">
                <div className="input-data">
                     <input type="date" id="dob" {...register("dob",{
                        valueAsDate : true,
                        required : {
                            value : true,
                            message : "Date of birth is required"
                        }
                     })}/>
                     <div className="underline"></div>
                     <label >Channel</label>
                     <p className="error">{errors.dob?.message}</p>
                </div>
             </div>

         <br />
            <div className="form-row submit-btn">
               <div className="input-data">
                  <div className="inner"></div>
                  <input type="submit" value="submit"/>
               </div>
            </div>
            <div className="form-row submit-btn">
               <div className="input-data">
                  <div className="inner"></div>
                  <input type="button" onClick={handleGetValues} value="get Form Values"/>
               </div>
            </div>
            <div className="form-row submit-btn">
               <div className="input-data">
                  <div className="inner"></div>
                  <input type="button" onClick={handleSetValue} value="Set Form Values"/>
               </div>
            </div>
        
      
      </form>
    </div>
  
 )
}
export default YouTubeForm;