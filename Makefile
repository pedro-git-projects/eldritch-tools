object_name := necronomicon
output_dir := dist

run:
	go build -o $(object_name) ./src/*.go;
	mv $(object_name) $(output_dir)

clean:
	rm -rf $(output_dir)/$(object_name) 
