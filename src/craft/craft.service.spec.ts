import { Test, TestingModule } from '@nestjs/testing';
import { CraftService } from './craft.service';
import { UploadService } from '../upload/upload.service';
import { getModelToken } from '@nestjs/mongoose';
import { Readable } from 'stream';
import { Craft } from './craft.schema';
import { craftStub } from '../stubs/craft.stub';
import { mockSchema } from './__mocks__/craft.schema';

const mockUploadService = () => ({
  uploadFile: jest
    .fn()
    .mockResolvedValue(
      'https://assignment-2-ecommerce.s3.amazonaws.com/test.png',
    ),
});

describe('CraftService', () => {
  let service: CraftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CraftService,
        { provide: UploadService, useFactory: mockUploadService },
        {
          provide: getModelToken(Craft.name),
          useValue: mockSchema,
        },
      ],
    }).compile();

    service = module.get<CraftService>(CraftService);
  });

  describe('addCraft', () => {
    test('should add a craft', async () => {
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

      const mockCraft = {
        name: craftStub().name,
        description: craftStub().description,
        price: craftStub().price,
        stock: craftStub().stock,
      };

      const savedCraft = craftStub();

      jest.spyOn(service, 'addCraft').mockResolvedValue(savedCraft);

      const result = await service.addCraft(mockCraft, mockFile);

      expect(result).toEqual(savedCraft);
    });
  });

  describe('getAllCrafts', () => {
    test('should get all crafts', async () => {
      const crafts = [craftStub()];

      jest.spyOn(service, 'getAllCrafts').mockResolvedValue(crafts);

      const result = await service.getAllCrafts('ALL');

      expect(result).toEqual(crafts);
    });
  });

  describe('getCraftById', () => {
    test('should get a craft by id', async () => {
      const craft = craftStub();

      jest.spyOn(service, 'getCraftById').mockResolvedValue(craft);

      const result = await service.getCraftById(craftStub()._id);

      expect(result).toEqual(craft);
    });
  });
});
