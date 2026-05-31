// создаем мок обьекты для запросов (чтобы сделать имитацию )
import {NextFunction, Request, Response} from "express";
import permit from "./permit";
import {expect} from "vitest";

interface RequestWithUserRole extends Request {
    user?: {role: string};
}

const createMockRequest = (user?: {role: string}) => ({user}) as RequestWithUserRole;

const createMockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnValue(res);
    res.send = vi.fn().mockReturnValue(res);
    return res;
};

const createMockNext = () => vi.fn() as NextFunction;

describe('permit middleware', () => {

    it('should allow access if user is authenticated and has a permitted role', () => {
        // тест случая когда пользователь залогинился (токен) и имеет разрешенную роль

        const req = createMockRequest({role: 'admin'});
        const res = createMockResponse();
        const next = createMockNext();

        const middleware = permit('admin', 'user');
        middleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should deny access if user is unauthenticated', () => {
        // тест случая когда пользователь не аунтефицирован

        const req = createMockRequest();
        const res = createMockResponse();
        const next = createMockNext();

        const middleware = permit('admin', 'user');
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({message: 'Please authenticate'});
        expect(next).not.toHaveBeenCalled();
    });

    it('should deny access if user has an unauthenticated role', () => {
        // тест случая когда пользователь аунтефицирован, но имеет не подабующую роль

        const req = createMockRequest({role: 'guest'});
        const res = createMockResponse();
        const next = createMockNext();

        const middleware = permit('admin', 'user');
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({message: 'You do not have permission to perform this action'});
        expect(next).not.toHaveBeenCalled();
    });
});
