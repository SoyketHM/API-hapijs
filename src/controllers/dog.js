var Dog =  require('../models/dog');

/**
 * List Dogs
 */
exports.list = async (req, h) => {
    const dogs = await Dog.find({}).exec();
    if (!dogs) {
      return { statusCode: 400, message: 'Dog not found' };
    }else{
      return { statusCode: 200, dog: dogs };
    }
}

/**
 * Get Dog by ID
 */
exports.get = async (req, h) => {
    const dog = await Dog.findById(req.params.id).exec();
    if (!dog) {
        return { statusCode: 400, message: 'Dog not found' };
    }else{
        return { statusCode: 200, dog: dog };
    }    
}


/**
 * POST a Dog
 */
exports.create = async (req, h) => {
    const dogData = {
    name: req.payload.name,
    breed: req.payload.breed,
    age: req.payload.age,
    image: req.payload.image
    };
  
  const dog = await Dog.create(dogData);
  if (!dog) {
      return { statusCode: 400, message: 'Dog created not successfully' };
    }else{
        return { statusCode: 200, message: "Dog created successfully", dog: dog };
    }
}

/**
 * PUT | Update Dog by ID
 */
exports.update = async (req, h) => {
    const dogData = {
        name: req.payload.name,
        breed: req.payload.breed,
        age: req.payload.age,
        image: req.payload.image
      };
    const dog = await Dog.findOneAndUpdate({ _id: req.params.id },dogData);

    if (dog) return { statusCode: 200, message: "Dog updated successfully", dog: dogData };
}

/**
 * Delete Dog by ID
 */
exports.remove = async (req, h) => {
    const dog = await Dog.findOneAndRemove({ _id: req.params.id });

    if (dog) return { statusCode: 200, message: "Dog deleted successfully" };
}