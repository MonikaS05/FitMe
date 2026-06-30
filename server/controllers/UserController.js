// server/controllers/UserController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // <-- Note the .js extension

// -- REGISTER CUSTOMER --
export const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({
      name,
      email,
      password,
      role: 'customer',
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// -- REGISTER TAILOR --
// server/controllers/UserController.js

// ... (keep registerCustomer and loginUser as they are) ...

// -- REGISTER TAILOR --
export const registerTailor = async (req, res) => {
  // 1. Destructure all the new fields from req.body
  const { name, email, password, location, phoneNumber, bio, specializations } = req.body;

  // 2. Validate required fields
  if (!location || !specializations || specializations.length === 0) {
    return res.status(400).json({ msg: 'Please provide location and at least one specialization.' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 3. Create new User object with all fields
    user = new User({
      name,
      email,
      password,
      location,
      phoneNumber,
      bio,
      specializations,
      role: 'tailor', // Set the role
    });

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 5. Save to database
    await user.save();

    // 6. Create and return token
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// ... (keep loginUser and getTailors functions as they are) ...
// -- UNIFIED LOGIN --
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- ADD THIS NEW FUNCTION AT THE BOTTOM ---
// @desc    Get all users with the role 'tailor'
// @route   GET /api/users/tailors
// @access  Private
export const getTailors = async (req, res) => {
  try {
    // Find all users where role is 'tailor'
    // .select('-password') means "exclude the password" from the result
    const tailors = await User.find({ role: 'tailor' }).select('-password');
    
    res.json(tailors); // Send the list of tailors as a JSON response

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};