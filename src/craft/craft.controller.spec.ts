import { Test, TestingModule } from '@nestjs/testing';
import { CraftController } from './craft.controller';
import { CraftService } from './craft.service';
import { craftStub } from '../stubs/craft.stub';
import { Readable } from 'stream';

jest.mock('./craft.service');

describe('CraftController', () => {
  let controller: CraftController;
  let service: CraftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CraftController],
      providers: [CraftService],
    }).compile();

    controller = module.get<CraftController>(CraftController);
    service = module.get<CraftService>(CraftService);
  });

  describe('getCraftById', () => {
    describe('when getCraftById is called', () => {
      let craft;

      beforeEach(async () => {
        craft = await controller.getCraftById(craftStub()._id);
      });

      test('then it should call craftService', () => {
        expect(service.getCraftById).toBeCalledWith(craftStub()._id);
      });

      test('then it should return a craft', () => {
        expect(craft).toEqual(craftStub());
      });
    });
  });

  describe('getAllCrafts', () => {
    describe('when getAllCrafts is called', () => {
      let crafts;

      beforeEach(async () => {
        crafts = await controller.getAllCrafts('ALL');
      });

      test('then it should call craftService', () => {
        expect(service.getAllCrafts).toBeCalled();
      });

      test('then it should return crafts', () => {
        expect(crafts).toEqual([craftStub()]);
      });
    });
  });

  describe('addCraft', () => {
    describe('when addCraft is called', () => {
      let craft;

      const craftDto = {
        name: craftStub().name,
        description: craftStub().description,
        price: craftStub().price,
        stock: craftStub().stock,
      };

      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('mocked file buffer'),
        destination: '/mocked/destination',
        filename: 'mocked-file.jpg',
        path: '/mocked/path/mocked-file.jpg',
        stream: Readable.from([]),
      };

      beforeEach(async () => {
        craft = await controller.addCraft(craftDto, mockFile);
      });

      test('then it should call craftService', () => {
        expect(service.addCraft).toBeCalledWith(craftDto, mockFile);
      });

      test('then it should return a craft', () => {
        expect(craft).toEqual(craftStub());
      });
    });
  });

  describe('deleteCraft', () => {
    describe('when deleteCraft is called', () => {
      beforeEach(async () => {
        await controller.deleteCraft(craftStub()._id);
      });

      test('then it should call craftService', () => {
        expect(service.deleteCraft).toBeCalledWith(craftStub()._id);
      });
    });
  });
});
