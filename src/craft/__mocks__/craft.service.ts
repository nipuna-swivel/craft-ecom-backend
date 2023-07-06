import { craftStub } from '../../stubs/craft.stub';

export const CraftService = jest.fn().mockReturnValue({
  getAllCrafts: jest.fn().mockResolvedValue([craftStub()]),
  getCraftById: jest.fn().mockResolvedValue(craftStub()),
  addCraft: jest.fn().mockResolvedValue(craftStub()),
  updateCraft: jest.fn().mockResolvedValue(craftStub()),
  deleteCraft: jest.fn(),
});
