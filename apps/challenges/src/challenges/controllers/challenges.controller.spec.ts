import { Test, TestingModule } from '@nestjs/testing';
import { ChallengesService } from '../services/challenges.service';
import { ChallengesController } from './challenges.controller';

describe('ChallengesController', () => {
  let controller: ChallengesController;
  let service: ChallengesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengesController],
      providers: [
        {
          provide: ChallengesService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ChallengesController>(ChallengesController);
    service = module.get<ChallengesService>(ChallengesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
