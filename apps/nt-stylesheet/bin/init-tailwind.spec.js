import { exec } from 'child_process';
import fs from 'fs';
import readline from 'readline';
import { describe, expect, it, vi } from 'vitest';

import {
    createPostCSSConfig,
    createTailwindConfig,
    initialize,
    installPackage,
} from './init-tailwind.js';

vi.mock('fs');
vi.mock('child_process');
vi.mock('readline');

describe('init-tailwind.js', () => {
    describe('installPackage', () => {
        it('should install package successfully', async () => {
            exec.mockImplementation((cmd, callback) => callback(null));
            await expect(installPackage('nt-stylesheet')).toStrictEqual(
                Promise.resolve()
            );
            expect(exec).toHaveBeenCalledWith(
                'npm install nt-stylesheet',
                expect.any(Function)
            );
        });

        it('should fail to install package', async () => {
            const error = new Error('Installation failed');
            exec.mockImplementation((cmd, callback) => callback(error));
            await expect(installPackage('nt-stylesheet')).rejects.toThrow(
                'Installation failed'
            );
        });
    });

    describe('createTailwindConfig', () => {
        it('should create tailwind.config.js file', () => {
            fs.writeFile.mockImplementation((path, content, callback) =>
                callback(null)
            );
            createTailwindConfig();
            expect(fs.writeFile).toHaveBeenCalledWith(
                'tailwind.config.js',
                expect.stringContaining('module.exports = {'),
                expect.any(Function)
            );
        });
    });

    describe('createPostCSSConfig', () => {
        it('should create postcss.config.js file', () => {
            fs.writeFile.mockImplementation((path, content, callback) =>
                callback(null)
            );
            createPostCSSConfig();
            expect(fs.writeFile).toHaveBeenCalledWith(
                'postcss.config.js',
                expect.stringContaining('module.exports = {'),
                expect.any(Function)
            );
        });
    });

    describe('initialize', () => {
        it('should initialize successfully', async () => {
            exec.mockImplementation((cmd, callback) => callback(null));
            readline.createInterface.mockReturnValue({
                question: (query, callback) => callback('y'),
                close: vi.fn(),
            });
            fs.writeFile.mockImplementation((path, content, callback) =>
                callback(null)
            );

            await initialize();

            expect(exec).toHaveBeenCalledWith(
                'npm install nt-stylesheet',
                expect.any(Function)
            );
            expect(fs.writeFile).toHaveBeenCalledWith(
                'tailwind.config.js',
                expect.stringContaining('module.exports = {'),
                expect.any(Function)
            );
            expect(fs.writeFile).toHaveBeenCalledWith(
                'postcss.config.js',
                expect.stringContaining('module.exports = {'),
                expect.any(Function)
            );
        });
    });
});
