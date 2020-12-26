#!/usr/bin/env python

import argparse
import json

def split_chunks(filename, size, data):
    for i in range(0, len(data), size):
        with open("{}-{}.txt".format(filename, i), "w+") as f:
            f.write(str(data[i:i+size]).replace("\'", "\""))

def main(args):
    with open(args.file, "r+") as f:
        data = json.load(f)
    split_chunks("{}".format(args.file), args.size, data)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="split file into chunks",formatter_class=argparse.RawTextHelpFormatter)
    parser.add_argument("file", type=str, metavar="<file need to be split>")
    parser.add_argument("size", type=int, metavar="<chunck size>")
    args = parser.parse_args()

    main(args)
