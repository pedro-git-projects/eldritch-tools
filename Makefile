object_name := necronomicon
output_dir := dist

build:
	go build -o $(object_name) ./src/*.go;
	mv $(object_name) $(output_dir)

run:
	./$(output_dir)/$(object_name)

clean:
	rm -rf $(output_dir)/$(object_name) 
