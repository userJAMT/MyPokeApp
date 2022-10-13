export default function validations (allPokemons, input) {
    let errors = {};
    const validName = /^[a-zA-ZñÑ\s]+$/i;
    const validUrl = /^(ftp|http|https):\/\/[^ "]+\.\S+$/;
  
    if (!input.name) 
        errors.name = "Name is required";
    else if (input.name[0] === " ") 
        errors.name = "Be careful, you got a space at the startt"
    else if (!validName.test(input.name)) 
      errors.name = "Name can only contains letters";
    else if (input.name.length < 4) 
      errors.name = "Name must have a minimum length of 4 letters";
    else if (allPokemons.some((e) => e.name.toLowerCase() === input.name.toLowerCase()))
      errors.name = "That name already exist"
  
    if (input.img && !validUrl.test(input.img)) 
      errors.img = "Image field must have a valid URL or be empty";
  
    if (input.types){
      if (input.types.length <= 0 || input.types.length > 2)
        errors.types = "Pokémons must have one or two types";
    }
    if (input.weight > 9999 || input.weight < 1) 
      errors.weight = "Value must be an integer greater than 0 and not be greater than 9999"
  
    if (input.height > 200 || input.height < 1) 
      errors.height = "Value must be an integer greater than 0 and not be greater than 200"
  
    if (input.hp > 255 || input.hp < 1) 
      errors.hp = "Value must be an integer greater than 0 and not be greater than 255"
  
    if (input.attack > 190 || input.attack < 5) 
      errors.attack = "Value must be an integer greater than 4 and not be greater than 190"
  
    if (input.defense > 250 || input.defense < 5) 
      errors.defense = "Value must be an integer greater than 4 and not be greater than 250"
  
    if (input.speed > 180 || input.speed < 5) 
      errors.speed = "Value must be an integer greater than 4 and not be greater than 180"
  
    return errors;
  }