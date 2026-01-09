import { UserService } from "../src/services/user.service";
import { User } from "../src/database/models/user";


jest.mock('../src/database/models/user');


jest.mock('../src/database/models/index', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Trainee: {},
  Company: {},
  initModels: jest.fn(),
}));

describe('UserService - check email', () => {
  let userService: UserService;
  
  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  test("email already exists", async () => {
    const userData = { email: 'test@example.com' };
    (User.findOne as jest.Mock).mockResolvedValue({ userId: 1, email: userData.email });

   
  });
});